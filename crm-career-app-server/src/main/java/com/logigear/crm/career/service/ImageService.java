package com.logigear.crm.career.service;

import java.io.File;
import java.io.IOException;
import java.net.FileNameMap;
import java.net.MalformedURLException;
import java.net.URLConnection;
import java.nio.file.FileVisitResult;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.attribute.BasicFileAttributes;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.logigear.crm.career.exception.FileStorageException;
import com.logigear.crm.career.exception.MultiErrorException;
import com.logigear.crm.career.model.ImageDto;
import com.logigear.crm.career.property.AppProperties;
import com.logigear.crm.career.repository.ImageRepository;
import com.logigear.crm.career.util.Util;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class ImageService {

    private final Path imageStorageLocation;

    private final ImageRepository imageRepository;
    
    public ImageService(AppProperties properties, ImageRepository imageRepository) {
    	this.imageRepository = imageRepository;
        this.imageStorageLocation = Paths.get(properties.getUploadDir()).toAbsolutePath().normalize();
        
        try {
            Files.createDirectories(this.imageStorageLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored", ex);
        }
    }

    public Resource loadFileAsResource(String fileName) {
        try {
            Path filePath = this.imageStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if(resource.exists()) {
                return resource;
            } else {
            	throw new MultiErrorException().httpStatus(HttpStatus.NOT_FOUND).validate(false, "com.logigear.crm.career.error.fileNotFound", fileName);
            }
        } catch (MalformedURLException ex) {
        	throw new MultiErrorException().httpStatus(HttpStatus.NOT_FOUND).validate(false, "com.logigear.crm.career.error.fileNotFound", fileName);
        }
    }
    
    public Flux<ImageDto> getImages() {
		return imageRepository.findAll();
	}
    
    public Mono<ImageDto> findImageById(String id) {
		return imageRepository.findById(id).switchIfEmpty(Util.notFoundMono());
	}
	
    @PreAuthorize("hasAuthority('ADMIN')")
	public Mono<ImageDto> newImage(Mono<FilePart> part) {
		return part
						 .log("createImage")
						 .flatMap(filepart -> imageRepository.save(new ImageDto(filepart.filename())).zipWith(Mono.just(filepart))) // save data to DB
						 .flatMap(pair -> {
							 ImageDto imgDto = pair.getT1();
							 FilePart filepart = pair.getT2();
							 
							String location =  imgDto.getId() + "/" + imgDto.getName();
							imgDto.setLocation(location);
							// save file on disk
							File destFile = this.imageStorageLocation.resolve(location).toFile();
							
							// TODO: improve code for exception
							try {
								deleteDirectory(destFile.toPath().getParent());
								destFile.getParentFile().mkdir();
								destFile.createNewFile();
							} catch (IOException e) {
								throw new RuntimeException(e);
							}
							
						    return filepart.transferTo(destFile).then(Mono.just(imgDto));
						 })
						 .flatMap(fDto -> {
							 
							 // rename file
							 File f =  this.imageStorageLocation.resolve(fDto.getLocation()).toFile();
							 
							 FileNameMap fileNameMap = URLConnection.getFileNameMap();
							 String mimeType = fileNameMap.getContentTypeFor(f.getName());
							 if(mimeType == null) {
								 mimeType = "";
							 }
							 fDto.setType(mimeType);
							 fDto.setSize(f.length());
							 
							 return imageRepository.save(fDto);
						 })
						 .log("createImage-flatMap")
						 .log("createImage-done");
				 	 			
	}
    
    @PreAuthorize("hasAuthority('ADMIN')")
	public Mono<ImageDto> updateImage(String id, ImageDto img) {
		return findImageById(id)
				.doOnNext(existedImg -> {
					existedImg.setName(img.getName());
				})
				.flatMap(imageRepository::save);
	}
    
	@PreAuthorize("hasAuthority('ADMIN')") 
    public Mono<Void> deleteImage(String id) {
        return findImageById(id).flatMap(existedImg -> {
        	
        	Path dir = this.imageStorageLocation.resolve(existedImg.getId());
        	try {
				deleteDirectory(dir);
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
			return imageRepository.deleteById(existedImg.getId());
        });
    }
	
	private void deleteDirectory(Path directory) throws IOException {

		if (Files.exists(directory)) {
			Files.walkFileTree(directory, new SimpleFileVisitor<Path>() {
				@Override
				public FileVisitResult visitFile(Path path, BasicFileAttributes basicFileAttributes)
						throws IOException {
					Files.delete(path);
					return FileVisitResult.CONTINUE;
				}

				@Override
				public FileVisitResult postVisitDirectory(Path directory, IOException ioException) throws IOException {
					Files.delete(directory);
					return FileVisitResult.CONTINUE;
				}
			});
		}
	}
}
