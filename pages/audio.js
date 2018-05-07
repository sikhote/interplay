import React from 'react';
import CustomHead from '../components/CustomHead';
import FileTable from '../components/FileTable';

export default () => (
  <div>
    <CustomHead title="audio" />
    <FileTable source="audio" />
  </div>
);
