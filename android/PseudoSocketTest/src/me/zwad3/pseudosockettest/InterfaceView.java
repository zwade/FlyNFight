package me.zwad3.pseudosockettest;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.view.MotionEvent;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.View;

public class InterfaceView extends SurfaceView {

	private Bitmap button;
	private JoystickDrawer drawer;
	private SurfaceHolder holder;
	
	private MotionEvent me;
	
	private int lXi;
	private int lXf;
	private int lYi;
	private int lYf;
	private int lP;
	
	public InterfaceView(Context context) {
		super(context);
		button = BitmapFactory.decodeResource(getResources(), R.drawable.ic_launcher);
		drawer = new JoystickDrawer(this);
        holder = getHolder();
        holder.addCallback(new SurfaceHolder.Callback() {

               @Override
               public void surfaceDestroyed(SurfaceHolder holder) {
                      boolean retry = true;
                      drawer.setRunning(false);
                      while (retry) {
                             try {
                                   drawer.join();
                                   retry = false;
                             } catch (InterruptedException e) {
                             }
                      }
               }

               @Override
               public void surfaceCreated(SurfaceHolder holder) {
                      drawer.setRunning(true);
                      drawer.start();
               }

               @Override
               public void surfaceChanged(SurfaceHolder holder, int format,
                             int width, int height) {
               }
               
        });
        
		// TODO Auto-generated constructor stub
	}

	public void onMotionEvent(View v, MotionEvent me) {
		this.me = me;
	}
	public void draw(Canvas canvas) {
		int x = 0;
		int y = 0;
		if (me != null) {
			for (int i = 0; i < me.getPointerCount(); i++) {
				if (me.getActionMasked() == me.ACTION_DOWN && me.getActionIndex() == i) {
					if (me.getX(i) < getWidth()/2) {
						lXf = ((int)me.getX());
						lYf = ((int)me.getY());
						
						lP = me.getPointerId(i);
						Log.d("FnF","pointer hold");
					} else {
						lXi = ((int)me.getX());
						lYi = ((int)me.getY());
						
						Log.d("FnF","pointer down");
						
						lP = me.getPointerId(i);
					}
				} 
			}
			
			int[] pos = new int[2];
			getLocationOnScreen(pos);
			x = (int) me.getX()-button.getWidth()/2 - pos[0];
			y = (int) me.getY()-button.getHeight()/2 - pos[1];
		}
		if (canvas != null) {
			canvas.drawColor(Color.BLACK);
			canvas.drawBitmap(button, x, y, null);
		}
	}
	
	

}
