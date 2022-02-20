import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

import styles from './styles';

const useStyles = makeStyles(styles);

const Footer = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <div className={classes.column}>
        <div className={classes.title}>Enum</div>

        <a
          href="https://chats.fantoms.art/"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          <i className={`fas fa-comments ${classes.linkIcon}`} />
          <span>{t('chats')}</span>
        </a>

        <a
          href="https://github.com/FantomsOpera"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          <i className={`fab fa-github ${classes.linkIcon}`} />
          <span>{t('github')}</span>
        </a>
      </div>
    </div>
  );
};

export default memo(Footer);
