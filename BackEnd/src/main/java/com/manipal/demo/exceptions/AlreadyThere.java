package com.manipal.demo.exceptions;


import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class AlreadyThere extends RuntimeException {

	
	private static final long serialVersionUID = 1L;

	private String errorMsg;

}
