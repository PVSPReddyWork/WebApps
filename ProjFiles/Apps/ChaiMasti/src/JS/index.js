const defaultIntroData = {
    showLoginPopup: false,
    isValidUser: false,
  };
  const loginPopupHolder = document.getElementById('loginPopupHolder');
  const onLoginClicked = () => {
    try {
      if(loginPopupHolder !== null && loginPopupHolder !== undefined){
        loginPopupHolder.style.visibility = "visible";
      }
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
    }
  };



  const onLoginButtonClick = (e) => {
    try {
      console.log(e);
      
    navigateToPage("DisplayLedger");
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
    }
  }

  const onTextChanged = (e) => {
    try {
      console.log(e.value);
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
    }
  }

  const onLogoutClicked = async () => {
    try {
      var result = await CustomLocalStorage.clearAllData();
      if (result) {
        console.log("done logout");
      }
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
    }
  };

  const onLoginCompleted = (isSuccessful) => {
    try {
      loginPopupHolder.style.visibility = "hidden";
      /*
      if (isSuccessful) {
        setIntroData({
          ...introData,
          data: { ...introData.data, showLoginPopup: false, isValidUser: true },
        });
      } else {
        setIntroData({
          ...introData,
          data: { ...introData.data, showLoginPopup: false },
        });
      }
      */
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
    }
  };

  function onDataObtainedFromSpreadSheet(data) {
        try{
          }
          catch(ex)
          {
            console.log(ex);
          }
      }
  function getSpreadSheetData(){
        //google.script.run.withSuccessHandler(onDataObtainedFromSpreadSheet).getSpreadSheetData();
      }
      getSpreadSheetData();