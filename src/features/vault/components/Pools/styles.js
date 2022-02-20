const styles = theme => ({
  container: {
    paddingTop: '4px',
  },
  tvl: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontSize: '32px',
    letterSpacing: '0',
    lineHeight: '32px',
    fontWeight: '550',
    color: theme.palette.text.primary,
    display: 'flex',
    alignItems: 'center',
  },
  titleLoader: {
    marginLeft: '12px',
  },
  subtitle: {
    letterSpacing: '0',
    lineHeight: '21px',
    [theme.breakpoints.down('xs')]: {
      lineHeight: '16px',
    },
    color: theme.palette.text.secondary,
    marginTop: '0',
    marginBottom: '16px',
  },
  text: {
    fontSize: '24px',
    textAlign: 'center',
    letterSpacing: '0',
    lineHeight: '32px',
    fontWeight: '550',
    color: theme.palette.text.primary,
    display: 'flex',
    alignItems: 'center',
  },
  infinityIcon: {
    marginBottom: '-6px',
    paddingRight: '5px',
  },
});

export default styles;
