(defun READ (str)
  str)

(defun EVAL (ast)
  ast)

(defun PRINT (str)
  str)

(defun rep (str)
  (PRINT (EVAL (READ str))))

(rep "(+ 1 2)")

(condition-case nil
      (while (setq line (read-from-minibuffer ""))
        (princ (rep line))
        (princ "\n")))

