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
  scrollContainer: {
    flexDirection: 'row',
    marginLeft: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollText: {
    fontSize: 20,
  },
  scrollImage: {
    width: 10,
    height: 20,
    marginLeft: 5,
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

export const SELECTSTYLES = StyleSheet.create({
  navContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  navMain: {
    padding: 15,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    top: 40,
  },
  navImage: {
    width: 28,
    height: 28,
  },
  navTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: COLORS.WHITE,
    paddingLeft: 15,
  },
  navId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.WHITE,
    marginLeft: 'auto',
  },
  mainContainer: {
    flex: 3,
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: 15,
    paddingTop: 60,
    marginBottom: 10,
    margin: 5,
  },
  pokeballImage: {
    alignSelf: 'flex-end',
    width: 260,
    height: 260,
    opacity: 0.1,
  },
  pokemonImage: {
    position: 'absolute',
    width: 220,
    height: 220,
    top: -160,
  },
  subtitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
  },
  type: {
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginHorizontal: 8,
  },
  typeText: {
    color: COLORS.WHITE,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  typeContainer: {
    flexDirection: 'row',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 2,
  },
  buttonImage: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    color: COLORS.WHITE,
    fontSize: 16,
  },
  description: {
    paddingHorizontal: 30,
    lineHeight: 24,
    fontSize: 16,
  },
});

export const ABOUTSTYLES = StyleSheet.create({
  middleAbout: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: COLORS.LIGHT_GRAY,
  },
  weightImage: {
    marginRight: 8,
    width: 16,
    height: 16,
  },
  heightImage: {
    marginRight: 8,
    width: 8,
    height: 16,
  },
  container: {
    flexDirection: 'row',
  },
  info: {
    flex: 1,
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoMoves: {
    paddingHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moveText: {
    textTransform: 'capitalize',
    paddingBottom: 5,
  },
  infoTitle: {
    fontSize: 12,
    textAlign: 'center',
    color: COLORS.MEDIUM_GRAY,
  },
});

export const STATSTYLES = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  divider: {
    borderRightWidth: 1,
    borderColor: COLORS.LIGHT_GRAY,
    paddingRight: 15,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'right',
    color: COLORS.MEDIUM_GRAY,
  },
  padtop: {
    paddingTop: 5,
  },
  padleft: {
    paddingLeft: 15,
  },
  separator: {
    paddingBottom: 5,
  },
  barContainer: {
    paddingTop: 10,
    paddingLeft: 15,
  },
  statBar: {
    width: 200,
    height: 6,
    borderRadius: 10,
    backgroundColor: COLORS.LIGHT_GRAY,
    marginBottom: 16,
  },
  statValue: {
    height: '100%',
    borderRadius: 10,
    backgroundColor: COLORS.MEDIUM_GRAY,
  },
});

export const LOADSTYLE = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.LIGHT_GRAY,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 25,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  text: {
    fontWeight: 'bold',
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
  marginTop: {
    marginTop: 15,
  },
  marginTopBig: {
    marginTop: 30,
  },
});
