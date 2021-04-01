package com.logigear.crm.career.mail;

public interface MailSender<T> {
	
	void send(T mail);
	
}
