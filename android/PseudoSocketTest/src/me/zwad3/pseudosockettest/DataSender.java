package me.zwad3.pseudosockettest;

import android.app.Activity;
import android.os.Bundle;
import android.view.MotionEvent;
import android.view.View;
import android.view.Window;
import android.widget.LinearLayout;

public class DataSender extends Activity {
	
	private InterfaceView view;
	private LinearLayout ll;
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		
		view = new InterfaceView(this);
		ll = new LinearLayout(this);
		ll.addView(view);
		view.setOnTouchListener(new View.OnTouchListener() {
	        @Override
	        public boolean onTouch(View v, MotionEvent event) {
	        	view.onMotionEvent(v,event);
	            return true;
	        }
	    });
		setContentView(ll);
		
	}
}


