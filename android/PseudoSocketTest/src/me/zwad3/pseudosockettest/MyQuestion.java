package me.zwad3.pseudosockettest;

import android.util.Log;

import com.zwad3.PseudoSocket.Question;

public class MyQuestion implements Question {

	@Override
	public void response(String response) {
		Log.d("PSS","Woo he responded: "+response);
		
	}

	@Override
	public String question() {
		// TODO Auto-generated method stub
		return "who am i";
	}
	
		
}
