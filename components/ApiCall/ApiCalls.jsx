import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, ActivityIndicator } from 'react-native';

const ApiCalls = () => {
  
    const [ loading, setLoading ] = useState(false);

  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    async function getDataFromApi() {
        //Loading Stage
        setLoading(true)
        //API Call
      try {
        const apiResponse = await fetch('https://dummyjson.com/products');
        const finalData = await apiResponse.json();
        console.log(finalData);

        if (finalData && finalData.users) {
          setApiData(finalData.users.map(userItem => `${userItem.firstName} ${userItem.lastName} ${userItem.age}`));
        }
      } catch (error) {
        console.error('Error fetching data:', error);

        setLoading(false);
      }
    }

    getDataFromApi();
  }, []);

  console.log(loading, "loading");

  if (loading) {
    return (
        <ActivityIndicator  color={"red"} size={"large"}/>
    
    )
  }

  

  return (
    <View>
      <Text>This is my View</Text>
      <View>
        <FlatList
          data={apiData}
          renderItem={({ item }) => <Text>{item}</Text>}
          keyExtractor={(item, index) => `${index}`}
        />
      </View>
    </View>
  );
};

export default ApiCalls;
