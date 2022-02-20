import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import Menu from '@material-ui/icons/Menu';
import Close from '@material-ui/icons/Close';
import WbSunny from '@material-ui/icons/WbSunny';
import NightsStay from '@material-ui/icons/NightsStay';
//import { Dialog, withStyles } from '@material-ui/core';
import styles from './styles';

const useStyles = makeStyles(styles);

const Header = ({ links, isNightMode, setNightMode }) => {
  const { chain } = useParams();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const classes = useStyles();
  const { t } = useTranslation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar className={`${classes.appBar} ${classes.dark}`} position="relative">
      <Toolbar className={classes.container}>
        <Link to={`/${chain}`}>
          <Button className={classes.title}>
            <Hidden xsDown>
              <img
                alt="Enum"
                src={require(`images/enum.svg`)}
                height={'40px'}
                className={classes.logo}
              />
              Enum + Villam
            </Hidden>
            <Hidden smUp>
              <img
                alt="Enum"
                src={require(`images/enum.svg`)}
                height={'35px'}
                className={classes.logo}
              />
            </Hidden>
          </Button>
        </Link>

        <div className={classes.middleNav}>
          <Hidden smDown>
            {renderLink('chats', t('Chats'), 'comments', classes)}
            {renderLink('cyber', t('NFTs'), 'file-alt', classes)}
            {renderLink('fns', t('Fantom Names'), 'book', classes)}
          </Hidden>
          <Link className={classes.btnBoost} to={`/${chain}/stake`}>
            <img alt="Boost" src={require('images/stake/boost.svg')} />
          </Link>
        </div>

        <Hidden smDown implementation="css">
          <div className={classes.collapse}>{links}</div>
        </Hidden>
        <Hidden mdUp>
          <IconButton
            className={classes.iconButton}
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>

      <Hidden mdUp implementation="js">
        <Drawer
          variant="temporary"
          anchor={'right'}
          open={mobileOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
          onClose={handleDrawerToggle}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            className={classes.closeButtonDrawer}
          >
            <Close />
          </IconButton>
          <div className={classes.appResponsive}>{links}</div>
          <div style={{ textAlign: 'center' }}>
            <LinkSidebar name="chats" label={t('Chats')} icon="comments" classes={classes} />
            <LinkSidebar name="cyber" label={t('NFTs')} icon="file-alt" classes={classes} />
            <LinkSidebar name="fns" label={t('Fantom Names')} icon="book" classes={classes} />
            <IconButton onClick={setNightMode} className={classes.icon}>
              {isNightMode ? <WbSunny /> : <NightsStay />}
            </IconButton>
          </div>
        </Drawer>
      </Hidden>
    </AppBar>
  );
};

const renderLink = (name, label, icon, classes) => {
  return (
    <a
      href={getLinkUrl(name)}
      target="_blank"
      rel="noopener noreferrer"
      className={classes.link}
      style={{ marginLeft: '5px', marginRight: '5px' }}
    >
      <i className={`fas fa-${icon} ${classes.icon}`} />
      <span>{label}</span>
    </a>
  );
};

const LinkSidebar = ({ name, label, icon, classes }) => (
  <div style={{ width: '100%', paddingTop: '10px' }}>{renderLink(name, label, icon, classes)}</div>
);

const getLinkUrl = name => {
  if (name === 'chats') {
    return `https://chats.fantoms.art`;
  } else if (name === 'cyber') {
    return `https://cyber.fantoms.art`;
  } else if (name === 'fns') {
    return `https://fns.fantoms.art`;
  }
  return `https://fantoms.art/`;
};

export default Header;
