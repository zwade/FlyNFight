package me.zwad3.pseudosockettest;

import java.util.Timer;
import java.util.TimerTask;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.view.Window;
import android.widget.LinearLayout;

import com.zwad3.PseudoSocket.PseudoSocketClient;

public class DataSender extends Activity {
	
	private InterfaceView view;
	private LinearLayout ll;
	private PseudoSocketClient psc;
	private boolean newInst = true;
	
	private Timer t;
	
	protected void onCreate(Bundle b) {
		Log.d("FnF", "DataSender Started");
		super.onCreate(b);
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		
		
		view = new InterfaceView(this);
		ll = new LinearLayout(this);
		ll.addView(view);
		
		final Activity that = this;
		view.setOnTouchListener(new View.OnTouchListener() {
	        @Override
	        public boolean onTouch(View v, MotionEvent event) {
	        	view.onMotionEvent(v,event);
	        	if (psc != null) {
	        		//psc.sendData("set "+(event.getX()/view.getWidth())+" "+(event.getY()/view.getHeight()));
	        	} else {
	        		psc = ((MyApplication)that.getApplication()).getPSC();
	        		Log.d("PSS","Fetching PSC");
	        	}
	            return true;
	        }
	    });
		
		t = new Timer();
		t.scheduleAtFixedRate(new TimerTask() {

			@Override
			public void run() {
				if (psc != null) {
					psc.sendData("ang="+view.getAngle()+";pow="+view.getDist());
				} else {
					psc = ((MyApplication)that.getApplication()).getPSC();
				}
			}
			
		}, 0, 100);
		
		setContentView(ll);
		
		newInst = false;
		
	}
	
	@Override
	protected void onPause() {
		super.onPause();
		if (t != null) {
			t.cancel();
			t = null;
		}
	}
	
	@Override
	protected void onSaveInstanceState(Bundle b) {
		super.onSaveInstanceState(b);
		b.putBoolean("new", newInst);
	}
}


