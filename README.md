# Borsa Frontend Exercise

![final](https://github.com/Robel-shewan/Borsa-Frontend-Exercise/blob/main/src/assets/images/Screenshot%20from%202024-04-25%2009-45-43.png)
![final](https://github.com/Robel-shewan/Borsa-Frontend-Exercise/blob/main/src/assets/images/Screenshot%20from%202024-04-25%2009-46-02.png)
![final](https://github.com/Robel-shewan/Borsa-Frontend-Exercise/blob/main/src/assets/images/Screenshot%20from%202024-04-25%2009-47-20.png)
![final](https://github.com/Robel-shewan/Borsa-Frontend-Exercise/blob/main/src/assets/images/Screenshot%20from%202024-04-25%2009-48-40.png)

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
5. Lazy load slice with Redux injectors
6. google place Auto complete
