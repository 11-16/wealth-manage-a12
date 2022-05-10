package com.miaoc.wealthmanage;

import android.content.Context;
import android.content.SharedPreferences;
import android.widget.Toast;

public class JavascriptInterface {
    Context context;

    JavascriptInterface(Context c) {
        context = c;
    }

    @android.webkit.JavascriptInterface
    public void submitPassword(String password) {
        SharedPreferences sharedPreferences = context.getSharedPreferences("wealth",Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString("pwd",password);
        editor.commit();
        Toast.makeText(context, "密码已修改为："+password, Toast.LENGTH_LONG).show();
    }
    public void exit(){
        
    }
}