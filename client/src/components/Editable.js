import React, {useState, useEffect} from "react";

// Component accept text, placeholder values and also pass
// what type of Input - input, textarea
const Editable = ({
                      text,
                      type,
                      placeholder,
                      childRef,
                      children,
                      ...props
                  }) => {

    // Manage the state whether to show the label or the input box.
    // By default, label will be shown
    const [isEditing, setEditing] = useState(false);

    // When isEditing state is changing, check whether it is set to
    // true, if true, then focus on the reference element
    useEffect(() => {
        if (childRef && childRef.current && isEditing === true) {
            childRef.current.focus();
        }
    }, [isEditing, childRef]);

    // Event handler while pressing any key while editing
    const handleKeyDown = (event, type) => {
        const {key} = event;
        const keys = ["Escape", "Tab"];
        const enterKey = "Enter";
        const allKeys = [...keys, enterKey];

        if (
            (type === "textarea" && keys.indexOf(key) > -1) ||
            (type !== "textarea" && allKeys.indexOf(key) > -1)
        ) {
            setEditing(false);
        }
    };

    return (
        <section {...props}>
            {isEditing ? (
                <div
                    onBlur={() => setEditing(false)}
                    onKeyDown={e => handleKeyDown(e, type)}
                >
                    {children}
                </div>
            ) : (
                <div onClick={() => setEditing(true)}>
                    <span>
                        <p>{text || placeholder || "Editable content"}</p>
                    </span>
                </div>
            )}
        </section>
    );
};

export default Editable;
