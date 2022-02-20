const styles = theme => ({
  container: {
    marginBottom: '24px',
    border: '2px solid ' + theme.palette.background.border,
  },
  accordion: {
    width: '100%',
    backgroundColor: theme.palette.background.primary,
    borderRadius: '7.5px',
  },
  divider: {
    margin: '0 30px',
    borderRadius: '7.5px',
  },
});

export default styles;
