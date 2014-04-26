package com.zwad3.PseudoSocket;

import java.net.URI;

import org.java_websocket.client.WebSocketClient;
import org.java_websocket.handshake.ServerHandshake;

import android.util.Log;

public class PseudoSocketClient extends WebSocketClient {

	public PseudoSocketClient(URI serverURI) {
		super(serverURI);
		Log.d("PSS","instantiated");
	}

	@Override
	public void onClose(int arg0, String arg1, boolean arg2) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void onError(Exception arg0) {
		// TODO Auto-generated method stub
		Log.d("PSS",arg0.toString());
		
	}

	@Override
	public void onMessage(String arg0) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void onOpen(ServerHandshake arg0) {
		// TODO Auto-generated method stub
		Log.d("PSS","Opened");
		send("hi");
		
	}

}
