package com.logigear.crm.career.model.audit;

import java.util.Optional;

import org.springframework.data.domain.AuditorAware;

public class AuditorAwareImpl implements AuditorAware<String> {

	private Optional<String> auditor = Optional.empty();

	public void setAuditor(Optional<String> auditor) {
		this.auditor = auditor;
	}
	
	@Override
	public Optional<String> getCurrentAuditor() {
		return auditor;
	}

}
