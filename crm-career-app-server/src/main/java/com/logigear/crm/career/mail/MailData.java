package com.logigear.crm.career.mail;

public class MailData {
	private String to;
	private String subject;
	private String body;

	public static MailData of(String to, String subject, String body) {
		
		MailData data = new MailData();
		
		data.to = to;
		data.subject = subject;
		data.body = body;

		return data;
	}
	
	public String getTo() {
		return to;
	}

	public void setTo(String to) {
		this.to = to;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}
	
	
}
