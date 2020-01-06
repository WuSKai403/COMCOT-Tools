# -*- coding: utf-8 -*-
"""
Created on Fri Dec  6 09:20:04 2019

@author: Skai
"""
import os

src_dir=r'D:\inun\inundation\raw_from_amber\T08\max_inundation'

for child_dir in os.listdir(src_dir):
    data=[]
    wholePath=os.path.join(src_dir,child_dir)
    print ('checking file '+ child_dir)
    if not os.path.isdir(wholePath):
        with open(wholePath,'r') as f:
            for line in f.read().split('\n'):
                for s in line.split('\t'):
                    if s != 'NaN' :
                        if s != '':
                            data.append(float(s))
    print('max number is: '+str(max(data)))
#    data = file.read().replace('\n', '')
#    print ([int(s) for s in data.split() if data.isdigit()])
        
