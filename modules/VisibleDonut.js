import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash/core';
import { setLoanGrade } from '../actions'
import Donut  from './Donut';
import image from '../images/loading.gif';

let prevSelection = 'All';

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (param) => {
      var currentSelection = param.data.selected 
                              ? param.data.name[0] : 'All';

    	if (currentSelection !==  prevSelection) {
    		prevSelection = currentSelection;
        dispatch(setLoanGrade(currentSelection))
      }
    }
  }
}

const mapStateToProps = (state) => {
    return {
        data: state.chartData.gradeData.data
    }
};

const loadDonut = (data, onClick) => {
  var height = 500;
  var width = height * 1.2; //golden ratio
  if (!data) {
    return (
        <div style={{padding: 145}} ><img src={image} /></div>
    );
  } else {
    return (
        <Donut 
          items={data}
          width={width}
          height={height}
          onClick={onClick}
        />
    );
  }
}

var labelStyle = {
  margin: 'auto',
  width: '70%'
};

const VisibleDonut = ({
	data,
  onClick
}) => {
    return (
        <div>
          <div style={labelStyle}>
            <label><h4>Select a pie slice to explore associated KPIs</h4></label>
          </div>
          
          {loadDonut(data, onClick)}

        </div>
    )
};

export default connect(mapStateToProps,mapDispatchToProps)(VisibleDonut);