alter user 'root'@'172.19.0.3' identified with mysql_native_password BY 'root';
create database dashboard;
use dashboard;

CREATE TABLE user ( id smallint unsigned not null auto_increment, name varchar(20) not null, constraint pk_example primary key (id) );
INSERT INTO user ( id, name ) VALUES ( null, 'Sample data' );
