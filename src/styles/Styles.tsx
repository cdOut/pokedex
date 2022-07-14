import {StyleSheet} from 'react-native';
import COLORS from './Colors';

export const LISTSTYLES = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
  },
  titleImage: {width: 24, height: 24, marginLeft: 5, marginRight: 10},
  searchBar: {
    borderRadius: 10,
    borderColor: COLORS.LIGHT_GRAY,
    backgroundColor: COLORS.WHITE,
    textAlign: 'center',
    borderWidth: 1,
    padding: 8,
  },
  list: {
    flex: 10,
  },
  wrapper: {
    justifyContent: 'space-between',
  },
});

export const CARDSTYLES = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.MEDIUM_GRAY,
    backgroundColor: COLORS.WHITE,
  },
  middle: {
    marginHorizontal: 10,
  },
  id: {
    textAlign: 'right',
    paddingTop: 5,
    paddingRight: 8,
    color: COLORS.MEDIUM_GRAY,
  },
  title: {
    backgroundColor: COLORS.MEDIUM_GRAY,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: 8,
  },
  text: {
    color: COLORS.WHITE,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  image: {
    width: 70,
    height: 70,
    marginBottom: 5,
    alignSelf: 'center',
  },
});

export const TXTSTYLES = StyleSheet.create({
  bigtitle: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
  },
});

export const STYLES = StyleSheet.create({
  flex: {
    flex: 1,
  },
  fill: {
    width: '100%',
    height: '100%',
  },
  font: {
    fontFamily: 'Poppins',
  },
});
