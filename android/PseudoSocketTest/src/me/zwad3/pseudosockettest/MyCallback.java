package me.zwad3.pseudosockettest;

import java.net.URI;

import android.util.Log;

import com.zwad3.PseudoSocket.PseudoSocketClient;
import com.zwad3.PseudoSocket.PseudoSocketCallback;

public class MyCallback extends PseudoSocketCallback {
	
	
	public void onOpen() {
		Log.d("PSS","it opened and i am too lazy to implelement the other mehtods");
		if (owner != null) {
			owner.ask(new MyQuestion());
			owner.sendData("woah data");
		}
	}
	
}
