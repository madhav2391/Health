package com.example.demo.request;

import javax.validation.constraints.NotBlank;
import com.fasterxml.jackson.annotation.JsonProperty;

public class LoginRequest {
	@NotBlank
  private String username;

	@NotBlank
	private String password;
	
	public LoginRequest(@JsonProperty("userName") String username,
						@JsonProperty("password") String password) {
		this.username = username;
		this.password = password;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}