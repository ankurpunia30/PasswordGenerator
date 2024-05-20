import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, TextInput,Keyboard } from 'react-native'
import React, { useState } from 'react'
//form validation
import * as Yup from 'yup'
import { Formik } from 'formik'
//this is the main component of the app
import BouncyCheckbox from 'react-native-bouncy-checkbox'

//yup is a library for form validation
//it is used to validate the form fields
//and there are other uses of yup 
//like formating the data
const PasswordSchema=Yup.object().shape({
  passwordLength:Yup.number()
  .min(4,'Should be at least 4 characters')
  .max(16,'Should be at most 16 characters')
  .required('Length is required')
})
export default function App() {
  //[predefined state,method to update the state]=useState(initial value)
  //useState is a hook that is used to manage the state of the component
  //password is the state variable
  //setPassword is the method that is used to update the state
  //we will never update the state directly
  //we will always use the method to update the state
  const [password,setPassword]=useState('')
  const [isPasswordGenerated,setIsPasswordGenerated]=useState(false)
  const [lowerCase,setLowerCase]=useState(true)
  const [upperCase,setUpperCase]=useState(false)
  const [number,setNumber]=useState(false)
  const [specialCharacter,setSpecialCharacter]=useState(false)
  //treat use state as a variable
  //and treat the method as a function that is used to update the variable 
  //this function will be used to generate the password string
  const generatePasswordString=(passwordLength:number)=>{
    //
    let characterList='';
    const lowerCaseCharacters='abcdefghijklmnopqrstuvwxyz'
    const upperCaseCharacters='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numberCharacters='0123456789'
    const specialCharacters='!@#$%^&*()_+'
    if(upperCase){
      characterList+=upperCaseCharacters
    }
    if(lowerCase){
      characterList+=lowerCaseCharacters
    }
    if(number){
      characterList+=numberCharacters
    }
    if(specialCharacter){
      characterList+=specialCharacters
    }
    //this function will be used to generate the password
    //it will return the password
    const passwordResult=createPassword(characterList,passwordLength)
    //this function will update the state of the password
    setPassword(passwordResult)
    setIsPasswordGenerated(true)
    //this function will return the password
    return password
  }
  //this function will be used to generate the password 
  const createPassword=(characters: string,passwordLength:number)=>{
    // we will use the characters to generate the password 
    let result=''
    for(let i=0;i<passwordLength;i++){
      //this will generate the random index
      const charIndex=Math.round(Math.random()*characters.length)
      //this will add the character to the result string
      result+=characters.charAt(charIndex)
    }
    //this will return the result
    return result
  }
  //this function will be used to update the state of the password 
  const resetPasswordState=()=>{
    // this will update the state of the password
    //as we are resetting the password
    //we will also reset the state of the password
    //and the state of the checkboxes
    setPassword('')
    setLowerCase(true)
    setUpperCase(false)
    setNumber(false)
    setSpecialCharacter(false)

    setIsPasswordGenerated(false)

  }
  return (
    //keyboardShouldPersistTaps is used to hide the keyboard when the user taps outside the input field
    <ScrollView keyboardShouldPersistTaps="always">
            <SafeAreaView style={styles.appContainer}>
        
        <View style={styles.formContainer}>
         
          <Text style={styles.title}>Password Generator</Text>
          <Formik
          //initialValues is used to set the initial values of the form fields
       initialValues={{passwordLength: '' }}
       //validationSchema is used to set the validation schema and the validation rules as well as the error messages
       validationSchema={PasswordSchema}
       //onSubmit is used to handle the form submission and in this case, it will generate the password string which will be displayed to the user
        onSubmit={values=>{
          console.log(values);
          //this function will generate the password string we are passing the password length to the function through the values object and converting the password length to a number
          generatePasswordString(Number(values.passwordLength))
          //this function will hide the keyboard when the user taps outside the input field 
          Keyboard.dismiss();
        }}
      
     >
       {({
        //these are the formik props that are used to manage the form fields
        //values is used to get the values of the form fields
         values,
         //errors is used to get the errors of the form fields
         errors,
         //touched is used to get the touched state of the form fields adn it is used to check if the form field is touched or not
         touched,
         //isValid is used to check if the form is valid or not because we have set the validation schema and the validation rules
         isValid,
          //handleChange is used to handle the change in the form fields and it is used to update the form fields
         handleChange,
         //handleSubmit is used to handle the form submission and it is used to submit the form
         handleSubmit,
         //handleReset is used to handle the reset of the form fields and it is used to reset the form fields
         handleReset,
         //isSubmitting is used to check if the form is submitting or not and it is used to check the submitting state of the form
         isSubmitting,
         /* and other goodies */
       }) => (
        <>
        <View style={styles.inputWrapper}>
          <View style={styles.inputColumn}>
            <Text style={styles.heading}>Password Length</Text>
            {touched.passwordLength && errors.passwordLength && (
              <Text style={styles.errorText}>
                {errors.passwordLength}
              </Text>
            )}
          
          
          </View>
          <TextInput 
          style={styles.inputStyle}
          value={values.passwordLength}
          onChangeText={handleChange('passwordLength')}
          placeholder='Eg. 8'
          keyboardType='numeric'
          />
        
        </View>
                <View style={styles.inputWrapper}>
                   
                    <Text style={styles.heading}>Include lowercase</Text>
                      <View>
                      <BouncyCheckbox
                      disableBuiltInState
                      isChecked={lowerCase}
                      onPress={() => setLowerCase(!lowerCase)}
                      fillColor="#29AB87"
                      />  
                      </View>
                      
                  </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Uppercase letters</Text>
                  <View>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={upperCase}
                      onPress={() => setUpperCase(!upperCase)}
                      fillColor="#FED85D"
                    />
                  </View>
                  
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Numbers</Text>
                  <View>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={number}
                    onPress={() => setNumber(!number)}
                    fillColor="#C9A0DC"
                  />
                </View>  
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Symbols</Text>
                    <View>
                    <BouncyCheckbox
                    disableBuiltInState
                    isChecked={specialCharacter}
                    onPress={() => setSpecialCharacter(!specialCharacter)}
                    fillColor="#FC80A5"
                  />

                    </View>
                  
                </View>
              <View style={styles.formActions}>
                  <TouchableOpacity
                  disabled={!isValid} 
            style={styles.primaryBtn}
        onPress={()=>handleSubmit()}
        >
          <Text style={styles.primaryBtnTxt}>
          Generate Password
          </Text>
          </TouchableOpacity>
        
        <TouchableOpacity
        style={styles.secondaryBtn}
        onPress={()=>{
          handleReset();
          resetPasswordState();
        }}
        >
          <Text  style={styles.secondaryBtnTxt}>Reset</Text>
          </TouchableOpacity>
        </View>
        
        </>
       )}
     </Formik>
     {isPasswordGenerated ?(
        <View style={[styles.card,styles.cardElevated]}>
        <Text style={styles.subTitle}>Result:</Text>
        <Text style={styles.description}>Long Press to copy</Text>
        <Text selectable={true} style={styles.generatedPassword}>{password}</Text>

        
      </View>
     ):null}
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}
//this is the stylesheet of the app 
//it is used to style the app

const styles = StyleSheet.create({
  //appContainer is the main container of the app 
  appContainer: {
    flex: 1,
  },
  //formContainer is the container of the form and the form fields
  formContainer: {
    margin: 8,
    padding: 8,
  },
  //title is the title of the app which is displayed at the top of the app
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  //subTitle is the sub title of the app which is displayed below the title
  subTitle: {
    fontSize: 26,
    color: '#16213e',
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
    fontWeight: '600',

  },
  inputWrapper: {
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#758283',
    color: 'white',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#28A745',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    paddingVertical: 10,
    justifyContent: 'center',
    borderRadius: 8,

    marginHorizontal: 8,
    backgroundColor: '#880808',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
    color:'#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#f0f0f0',
    marginVertical: 12,

    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#16213e'
  },
});