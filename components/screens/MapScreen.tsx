import React, {useState} from 'react';
import {
  Button,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

interface IMarker {
  latitude: number;
  longitude: number;
  name: string;
  id: number;
}

interface IEvent {
  nativeEvent: {coordinate: {longitude: number; latitude: number}};
}

interface IInfo {
  name: string;
  id: number;
}

const MapScreen = () => {
  const [isMarking, setMarking] = useState<boolean>(false);
  const [markers, setMarkers] = useState<IMarker[]>([]);
  const [markerTitle, setMarkerTitle] = useState<string>('');
  const [markerData, setMarkerData] = useState<IMarker>({} as IMarker);
  const [error, setError] = useState<string>('');
  const [pressedInfo, setPressedInfo] = useState<IInfo>({} as IInfo);

  const addMarker = async (e: IEvent) => {
    const marker: IMarker = {
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
      name: '',
      id: 0,
    };
    setMarking(true);
    setMarkerData(marker);
  };

  const checkPokemonValidity = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${markerTitle.toLowerCase()}`,
      );
      const json = await response.json();

      const marker = markerData;
      markerData.id = json.id;
      setMarkerData(marker);

      return true;
    } catch {
      setError('Invalid pokemon name');
      return false;
    }
  };

  const confirmMarker = async () => {
    if (await checkPokemonValidity()) {
      const marker = markerData;
      marker.name = markerTitle.toLowerCase();

      setMarkerTitle('');
      setError('');
      setMarkers([...markers, marker]);
      setMarkerData({} as IMarker);
      setMarking(false);
    }
  };

  const cancelMarker = async () => {
    setMarkerTitle('');
    setError('');
    setMarking(false);
  };

  const markerPress = async (marker: IMarker) => {
    const info: IInfo = {} as IInfo;
    info.id = marker.id;
    info.name = marker.name;
    setPressedInfo(info);
  };

  const infoCancel = async () => {
    if (Object.keys(pressedInfo).length > 0) {
      setPressedInfo({} as IInfo);
    }
  };

  return (
    <>
      <SafeAreaView>
        <MapView
          style={styles.mapContainer}
          initialRegion={{
            latitude: 50.059683,
            longitude: 19.934544,
            latitudeDelta: 0.09,
            longitudeDelta: 0.04,
          }}
          onPress={infoCancel}
          onLongPress={e => addMarker(e)}>
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              onPress={() => {
                markerPress(marker);
              }}
            />
          ))}
        </MapView>
        {Object.keys(pressedInfo).length > 0 && (
          <View style={styles.infoContainer}>
            <Image
              style={styles.infoImage}
              source={{
                uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pressedInfo.id}.png`,
              }}
            />
            <Text style={styles.infoTitle}>{pressedInfo.name}</Text>
          </View>
        )}
        {isMarking && (
          <Pressable onPress={cancelMarker} style={styles.markerSettings}>
            <Text style={styles.markerTitle}>Add Marker</Text>
            {error !== '' && <Text style={styles.markerError}>{error}</Text>}
            <TextInput
              style={styles.markerTextInput}
              onChangeText={setMarkerTitle}
              value={markerTitle}
              placeholder="Enter pokemon name"
            />
            <View style={styles.markerButtonContainer}>
              <Button color="black" onPress={confirmMarker} title="Add" />
              <Button color="black" onPress={cancelMarker} title="Cancel" />
            </View>
          </Pressable>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '20%',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  infoImage: {
    width: 100,
    height: 100,
  },
  mapContainer: {
    width: '100%',
    height: '100%',
  },
  markerSettings: {
    bottom: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(100, 100, 100, 0.4)',

    justifyContent: 'center',
    alignItems: 'center',
  },
  markerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  markerError: {
    paddingTop: 5,
    fontSize: 16,
    color: 'red',
  },
  markerTextInput: {
    borderWidth: 2,
    borderRadius: 15,
    padding: 15,
    margin: 10,
    width: 200,
    backgroundColor: 'white',
  },
  markerButtonContainer: {
    width: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default MapScreen;
