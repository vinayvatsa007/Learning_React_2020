import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SelectPicker(props) {
  const {
    label,
    value,
    name,
    onChange: cb,
    fullWidth,
    helperText,
    className,
    options,
  } = props;
  const handleChange = (e) => {
    cb && cb(name, e.target.value);
  };

  console.log("value in SlectPicker", value);
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel shrink id="demo-simple-select-placeholder-label-label">
        {label}
      </InputLabel>
      <Select
        fullWidth={fullWidth}
        labelId="demo-simple-select-placeholder-label-label"
        id="demo-simple-select-placeholder-label"
        value={value}
        onChange={handleChange}
        displayEmpty
        className={classes.selectEmpty}
      >
        {/* <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem> */}
        {options.map((menuItem) => {
          return <MenuItem value={menuItem.id}>{menuItem.value}</MenuItem>;
        })}
      </Select>
      {/* <FormHelperText>Label + placeholder</FormHelperText> */}
    </FormControl>
  );
}
