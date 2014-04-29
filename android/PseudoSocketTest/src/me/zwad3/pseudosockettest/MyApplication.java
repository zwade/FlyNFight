package me.zwad3.pseudosockettest;

import android.app.Application;
import android.util.Log;

import com.zwad3.PseudoSocket.PseudoSocketClient;

public class MyApplication extends Application {
	
	private PseudoSocketClient psc;
	
	@Override
	public void onCreate() {
		super.onCreate();		
		Log.d("PSS","Application Created!");
	}
	
	public void registerPSC(PseudoSocketClient psc) {
		this.psc = psc;
	}
	
	public PseudoSocketClient getPSC() {
		return this.psc;
	}
	
}
