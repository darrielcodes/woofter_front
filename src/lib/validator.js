import React from 'react'

const checker = (key, element) => {
 // false = no error
        // true = error
        switch (key) {
          
            case 'name':
                if ( element === '') {
                    return {
                        error: true,
                        message: "Cannot be empty"
                    }
                }
                if ( element.includes(' ')) {
                    return {
                        error: true,
                        message: "Cannot contain spaces"
                    }
                }
                return {
                    error: false,
                    message: ''
                }
            case 'email':
                if ( element === ' ') {
                    return {
                        error: true,
                        message: "Cannot be empty"
                    }
                }
                if ( element.includes(' ')) {
                    return {
                        error: true,
                        message: "Cannot contain spaces"
                    }
                }
                if ( element.includes('@') && element.includes('.')) {
                    return {
                    error: false,
                    message: ''
                  }
                }
                return {
                        error: true,
                        message: "Not a valid email"
                    }
            case 'password':
                if ( element === '') {
                    return {
                        error: true,
                        message: "Cannot be empty"
                    }
                }
                if ( element.includes(' ')) {
                    return {
                        error: true,
                        message: "Cannot contain spaces"
                    }
                }
                // if ( element.length < 8) {
                //     return {
                //         error: true,
                //         message: "Password must be at least 8 characters"
                //     }
                // }
                // let pattern = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$')
                // if (!pattern.test(element)) {
                //     return {
                //         error: true,
                //         message: "Password must be MORE COMPLEX"
                //     }
                // }
                return {
                    error: false,
                    message: ''
                  }
            default:
                break;
        }
} 

export const validator = (props) => {
    let validObj = {...props}
    for (const key in props) {
        const element = props[key];
        console.log(element);
        validObj = {
            ...validObj,
            [key]:  checker(key, element)
        }
        console.log(validObj);
    }

  return validObj
}