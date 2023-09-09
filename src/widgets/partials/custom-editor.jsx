import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export function CustomEditor({ value, onChange }) {
    return (
        <div>
            <ReactQuill theme="snow" value={value} className="rounded-lg" onChange={onChange} />
        </div>
    );
}

CustomEditor.defaultProps = {
    //
};

CustomEditor.propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
};

export default CustomEditor;
