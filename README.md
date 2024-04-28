# Borsa Frontend Exercise

![final](https://github.com/Robel-shewan/Borsa-Frontend-Exercise/blob/main/src/assets/images/Screenshot%from%2024-04-28%07-51-06.png)
![final](https://github.com/Robel-shewan/Borsa-Frontend-Exercise/blob/main/src/assets/images/Screenshot%20from%202024-04-28%2008-00-32.png)
![final](https://github.com/Robel-shewan/Borsa-Frontend-Exercise/blob/main/src/assets/images/Screenshot%20from%202024-04-28%2008-02-53.png)
![final](https://github.com/Robel-shewan/Borsa-Frontend-Exercise/blob/main/src/assets/images/Screenshot%20from%202024-04-28%2008-03-20.png)
[final](https://github.com/Robel-shewan/Borsa-Frontend-Exercise/blob/main/src/assets/images/Screenshot%20from%202024-04-28%2008-03-41.png)
![final](https://github.com/Robel-shewan/Borsa-Frontend-Exercise/blob/main/src/assets/images/Screenshot%20from%202024-04-28%2008-03-49.png)

For the google Place Autocomplete you must adding the google map API_KEY

<GooglePlacesAutocomplete
placeholder="Type a place"
onPress={(data, details = null) => {
setFieldValue('address', details?.formatted_address);
console.log(data, details);
}}
query={{ key: 'API Key' }}
fetchDetails={true}
onFail={error => console.log(error)}
onNotFound={() => console.log('no results')}
currentLocation={true}
currentLocationLabel="Your location!" // add a simple label
/>


# some of the Technology and architecture I was using

1. React Native with Expo
2. Redux and (Redux ToolKit)
  - Redux Saga
  - Redux injectors
3. Typescript
4. Redux-saga
5. Formik For Handling State
6. Data Validation I was using Yup
7. Lazy load slice with Redux injectors
8. google place Auto complete
