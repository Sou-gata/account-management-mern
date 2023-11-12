import { motion } from "framer-motion";

const PageAnimation = ({ children, className = "" }) => {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            {children}
        </motion.div>
    );
};

export default PageAnimation;
