package me.zwad3.pseudosockettest;

import java.util.Random;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;

public class LimitedActivity extends Activity {
	
	@Override
	protected void onCreate(Bundle sbi) {
		super.onCreate(sbi);
		if (sbi == null) {
			((MyApplication)getApplication()).startActivity(this);
		}
	}

}
