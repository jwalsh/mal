(setq env (make-hash-table))

;; Validate makunbound 
(defun void-variable-test ()
  (setq x 1)
  (let ((y 2))
    (let ((x y))
      x
      (makunbound 'x)
      x)))

(void-variable-test)
    
