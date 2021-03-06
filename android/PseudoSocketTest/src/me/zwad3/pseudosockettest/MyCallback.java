package me.zwad3.pseudosockettest;

import java.net.URI;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;

import com.zwad3.PseudoSocket.PseudoSocketClient;
import com.zwad3.PseudoSocket.PseudoSocketCallback;

public class MyCallback extends PseudoSocketCallback {
	
	private Activity parent;
	
	public MyCallback(Activity a) {
		parent = a;
	}
	
	public void onOpen() {
		Log.d("PSS","it opened and i am too lazy to implelement the other mehtods");
		if (owner != null) {
			//owner.ask(new MyQuestion());
			//owner.sendData("woah data");
		
		}
		((MyApplication)parent.getApplication()).registerPSC(owner);
		//Intent intent = new Intent(parent, DataSender.class);
		//parent.startActivity(intent);
		//boo-2
			
	
	}
	
	@Override
	public void onData(String msg) {
		if (msg.equals("dataSelect")) {
			Intent intent = new Intent(parent, PromptActivity.class);
			parent.startActivity(intent);
		}
		if (msg.equals("startGame")) {
			Intent intent = new Intent(parent, DataSender.class);
			Log.d("FnF", "Starting DataSender");
			parent.startActivity(intent);
		}
	}
	
	public void onClose() {
		Log.d("FnF","onClose");
		((MyApplication)parent.getApplication()).killLimited();
	}
	
}
