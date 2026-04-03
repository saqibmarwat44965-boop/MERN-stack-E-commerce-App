const CatchErr = (res, err) => {
    return res.status(500).json({
        error: err.message || 'Server error'
    });
};

const warning = (res, message) => {
    return res.status(200).json({ warning: message });
};

const error = (res, message) => {
    return res.status(200).json({ error: message });
};

const success = (res, message) => {
    return res.status(200).json({ message });
};

export {
    CatchErr,
    warning,
    error,
    success
};
