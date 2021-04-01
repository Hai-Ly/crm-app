package com.logigear.crm.career.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
@NoArgsConstructor
@AllArgsConstructor
public class UploadFileResponse {

	private String fileName;
	
	private String fileDownloadUri;
	
	private String fileType;
	
	private long size;

}
