import PropTypes from 'prop-types';
export function Button({ disabled, onClick, className, children, ...rest }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`h-fit justify-center py-2 px-4 border border-transparent rounded shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

