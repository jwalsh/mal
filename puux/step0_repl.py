import sys

def READ(str):
    str

def EVAL(ast):
    ast

def PRINT(mal):
    mal

def rep(str):
    PRINT(EVAL(READ(str)))

prompt = "user> "

print prompt

line = sys.stdin.readline()
while line:
    print line
    print prompt
    line = sys.stdin.readline()
