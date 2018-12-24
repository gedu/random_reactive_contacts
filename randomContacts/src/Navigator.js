import { createStackNavigator, createAppContainer } from 'react-navigation';

import ContactServiceStore from './redux/ContactServiceStore';
import DetailPanel from './screens/DetailPanel';

const MasterDetailNav = createStackNavigator({
    MasterView: {
        screen: ContactServiceStore     
    },
    DetailView: { 
        screen: DetailPanel
     },
    initialRouteName: 'MasterView',
});

export default createAppContainer(MasterDetailNav);