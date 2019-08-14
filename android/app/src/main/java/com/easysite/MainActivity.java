package com.easysite;

import com.facebook.react.ReactActivity;

//引入splash页面******************************
import android.os.Bundle; // here
import com.facebook.react.ReactActivity;
// react-native-splash-screen >= 0.3.1
import org.devio.rn.splashscreen.SplashScreen; // here
// react-native-splash-screen < 0.3.1
// import com.cboy.rn.splashscreen.SplashScreen; // here
public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "EasySite";
    }
    //引入splash页面******************************
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // SplashScreen.show(this);  // here
        // 加入statusBarColor************************
        SplashScreen.show(this, R.style.SplashScreenTheme);
        super.onCreate(savedInstanceState);
    }
}
