import React from 'react';
import PropTypes from 'prop-types';
import CustomHead from '../components/CustomHead';
import FileTable from '../components/FileTable';
import style from '../styles/list';

const List = ({ title, header, source }) => (
  <div className="root">
    <style jsx>{style}</style>
    <CustomHead title={title} />
    <h1>{header}</h1>
    <FileTable source={source} />
  </div>
);

List.propTypes = {
  title: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
};

export default List;
