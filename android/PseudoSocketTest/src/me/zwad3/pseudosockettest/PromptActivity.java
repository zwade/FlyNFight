package me.zwad3.pseudosockettest;

import com.zwad3.PseudoSocket.PseudoSocketClient;

import android.app.Activity;
import android.os.Bundle;
import android.os.Debug;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.Spinner;

public class PromptActivity extends LimitedActivity {
	
	private PseudoSocketClient psc;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.prompt_activity);
		
		psc = ((MyApplication)getApplication()).getPSC();
		
		Spinner spinner = (Spinner) findViewById(R.id.ship_spinner);
		ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this,R.array.ship_array, android.R.layout.simple_spinner_item);
		adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
		spinner.setAdapter(adapter);
		
		spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
			public void onItemSelected(AdapterView<?> parent, View view, int pos, long id) {
		        // An item was selected. You can retrieve the selected item using
		        // parent.getItemAtPosition(pos)
				Log.d("fnf",parent.getItemAtPosition(pos).toString());
				if (psc != null) {
					psc.sendData("ship="+parent.getItemAtPosition(pos).toString());
				}
		    }

			@Override
			public void onNothingSelected(AdapterView<?> parent) {
				// TODO Auto-generated method stub
				
			}

		});
		
		EditText tf = (EditText) findViewById(R.id.editText1);
		tf.addTextChangedListener(new TextWatcher() {

			@Override
			public void beforeTextChanged(CharSequence s, int start, int count, int after) {
				return;
				
			}

			@Override
			public void onTextChanged(CharSequence s, int start, int before, int count) {
				return;
				
			}

			@Override
			public void afterTextChanged(Editable s) {
				Log.d("fnf", s.toString());
				if (psc != null) {
					psc.sendData("name="+s.toString());
				}
			}
			
			
		});
		
	}
	
	public void startGame(View v) {
		Log.d("fnf","button pressed");
		if (psc != null) {
			psc.sendData("start=true");
		}
	}
	
	/**public void updateStatus(View v) {
		if (psc != null) {
			Spinner spinner = (Spinner) findViewById(R.id.ship_spinner);
			psc.sendData("ship="+spinner.getSelectedItem().toString());
		}
		Log.d("fnf","boo");
	}**/
}
