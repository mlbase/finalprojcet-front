SELECT COUNT(*) FROM SBS_LIKE AS SL left outer join SBS_FEED AS SF ON SL.FEED_SEQ=SF.SEQ

SELECT TA.*
		  FROM (SELECT RANK() OVER( ORDER BY REG_DATE 
		  			 DESC) AS RNUM
		             , (SELECT COUNT(*) FROM SBS_LIKE AS SL, SBS_FEED AS SF WHERE SL.FEED_SEQ=SF.SEQ) 
		             AS LNUM
		             , COUNT(1) OVER() AS TOTCNT
		             , SEQ
		             , NICKNAME
		             , CONTENT
		             , FILENAME
		             , TAG
		             , REG_DATE
		      FROM SBS_FEED FD
		)TA
		WHERE RNUM >= 1
		  AND RNUM <= 10

select ta.*
  from (select 
               fd.*
               ,ROW_NUMBER() OVER(ORDER BY fl.like_cnt desc, fd.reg_date desc) as rnum
          from hr.sbs_feed fd     
          left outer join 
          (select count(1) as like_cnt, feed_seq
                 from hr.sbs_like
                group by feed_seq) fl
          on fd.seq = fl.feed_seq)ta 
  where rnum >=1
    and rnum <=10;		  