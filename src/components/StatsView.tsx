import React from 'react';
import {View, Text} from 'react-native';
import {STATSTYLES} from '../styles/Styles';
import {stringifyPokemonId} from '../utils/Utils';
import StatBar from './StatBar';

const StatsView = ({type, stats}: {type: string; stats: number[]}) => {
  const TITLES = ['HP', 'ATK', 'DEF', 'SATK', 'SDEF', 'SPD'];

  return (
    <View style={STATSTYLES.container}>
      <View style={[STATSTYLES.divider, STATSTYLES.padtop]}>
        {TITLES.map(title => (
          <Text key={title} style={[STATSTYLES.title, STATSTYLES.separator]}>
            {title}
          </Text>
        ))}
      </View>
      <View style={[STATSTYLES.padtop, STATSTYLES.padleft]}>
        {stats.map((stat, index) => (
          <Text style={STATSTYLES.separator} key={index}>
            {stringifyPokemonId(stat.toString())}
          </Text>
        ))}
      </View>
      <View style={(STATSTYLES.padtop, STATSTYLES.barContainer)}>
        {stats.map((stat, index) => (
          <StatBar key={index} value={stat} type={type} />
        ))}
      </View>
    </View>
  );
};

export default StatsView;
