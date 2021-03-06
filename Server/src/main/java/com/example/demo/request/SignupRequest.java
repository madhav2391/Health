package com.example.demo.request;

import java.util.Set;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.*;

public class SignupRequest {
	
	
  public SignupRequest(@JsonProperty("userName") @NotBlank @Size(min = 3, max = 20) String username,
			@JsonProperty("email") @NotBlank @Size(max = 50) @Email String email, 
			@JsonProperty("role") Set<String> role,
			@JsonProperty("password") @NotBlank @Size(min = 6, max = 40) String password) {
		super();
		this.username = username;
		this.email = email;
		this.role = role;
		this.password = password;
	}

@NotBlank
  @Size(min = 3, max = 20)
  private String username;

  @NotBlank
  @Size(max = 50)
  @Email
  private String email;

  private Set<String> role;

  @NotBlank
  @Size(min = 6, max = 40)
  private String password;

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public Set<String> getRole() {
    return this.role;
  }

  public void setRole(Set<String> role) {
    this.role = role;
  }
}