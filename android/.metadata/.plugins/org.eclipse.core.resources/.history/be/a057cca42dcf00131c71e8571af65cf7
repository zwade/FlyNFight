package me.zwad3.pseudosockettest;

import android.app.Activity;
import android.app.Application;
import android.util.Log;

import com.zwad3.PseudoSocket.PseudoSocketCallback;

public class MyApplication extends Application {
	
	private PseudoSocketCallback psc;
	
	@Override
	public void onCreate() {
		super.onCreate();		
		Log.d("PSS","Application Created!");
	}
	
	public void registerPSC(PseudoSocketCallback psc) {
		this.psc = psc;
	}
	
	public PseudoSocketCallback getPSC() {
		return this.psc;
	}
}
