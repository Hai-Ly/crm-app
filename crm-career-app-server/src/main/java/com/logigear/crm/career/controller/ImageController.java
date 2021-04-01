package com.logigear.crm.career.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import com.logigear.crm.career.model.ImageDto;
import com.logigear.crm.career.service.ImageService;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/images")
public class ImageController {

	@Autowired
	private ImageService imageService;

	@GetMapping
	public Flux<ImageDto> getImages() {
		return imageService.getImages();
	}
	
	@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ImageDto> createImage(@RequestPart("files") Mono<FilePart> part) {
        return imageService.newImage(part);
    }
	
	@GetMapping("/{id}")
	public Mono<ResponseEntity<ImageDto>> getImageById(@PathVariable String id) {
		return imageService.findImageById(id).map(img -> ResponseEntity.ok(img))
				.defaultIfEmpty(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	@PutMapping("/{id}")
	public Mono<ImageDto> updateImage(@PathVariable String id, @Valid @RequestBody ImageDto img) {
		return imageService.updateImage(id, img);
	}

	@DeleteMapping("/{id}") 
    public Mono<Void> deleteImage(@PathVariable String id) {
		 return imageService.deleteImage(id);
    }
}
