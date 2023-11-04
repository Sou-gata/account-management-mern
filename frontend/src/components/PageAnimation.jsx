import { motion } from "framer-motion";

const PageAnimation = ({ children, className = "" }) => {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
        >
            {children}
        </motion.div>
    );
};

export default PageAnimation;
