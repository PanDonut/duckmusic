import Navigation from './navigation'

import styles from './mobile-navigation.module.css'
import { useSwipeable } from 'react-swipeable';
import { setMobileFooter } from '../../actions';
import { connect } from 'react-redux';

function MobileNavigation(props) {
    return (
      <nav className={styles.MobileNav}>
        <Navigation />        
      </nav>
    );
}

const mapStateToProps = (state) => {
  return {
    mobilefooter: state.mobilefooter
  };
};
  
export default connect(mapStateToProps, {setMobileFooter})(MobileNavigation);