# 账户名规则说明

在GXChain网络上，用户信息保存在一个账户对象里。每个账户都有一个唯一的账户id（示例：`1.2.*`），账户对象中包含了用户的账户名。在GXChain上，有自定义的规则，以下则对GXChain的规则做一个说明：

- GXChain账户名限制在1-63个字符

- GXChain账户名必须小写字母(a-z开头)

- GXChain账户名最后一个字母为(0-9a-z)

- GXChain账户名中存在`.`时，被`.`分隔的每个切片必须小写字母开头(a-z)，账户`a.1`无效，账户`a.b`有效

- GXChain账户名除首字母和尾字母外（包括`.`分隔的切片），可以使用(`a-z0-9-.`)

以下为账户名校验的代码：

```cpp
bool is_valid_name( const string& name )
{ try {
    const size_t len = name.size();

    if( len < GRAPHENE_MIN_ACCOUNT_NAME_LENGTH )
    {
        ilog(".");
        return false;
    }

    if( len > GRAPHENE_MAX_ACCOUNT_NAME_LENGTH )
    {
        ilog(".");
        return false;
    }

    size_t begin = 0;
    while( true )
    {
       size_t end = name.find_first_of( '.', begin );
       if( end == std::string::npos )
          end = len;
       if( (end - begin) < GRAPHENE_MIN_ACCOUNT_NAME_LENGTH )
       {
          idump( (name) (end)(len)(begin)(GRAPHENE_MAX_ACCOUNT_NAME_LENGTH) );
          return false;
       }
       switch( name[begin] )
       {
          case 'a': case 'b': case 'c': case 'd': case 'e': case 'f': case 'g': case 'h':
          case 'i': case 'j': case 'k': case 'l': case 'm': case 'n': case 'o': case 'p':
          case 'q': case 'r': case 's': case 't': case 'u': case 'v': case 'w': case 'x':
          case 'y': case 'z':
             break;
          default:
          ilog( ".");
             return false;
       }
       switch( name[end-1] )
       {
          case 'a': case 'b': case 'c': case 'd': case 'e': case 'f': case 'g': case 'h':
          case 'i': case 'j': case 'k': case 'l': case 'm': case 'n': case 'o': case 'p':
          case 'q': case 'r': case 's': case 't': case 'u': case 'v': case 'w': case 'x':
          case 'y': case 'z':
          case '0': case '1': case '2': case '3': case '4': case '5': case '6': case '7':
          case '8': case '9':
             break;
          default:
          ilog( ".");
             return false;
       }
       for( size_t i=begin+1; i<end-1; i++ )
       {
          switch( name[i] )
          {
             case 'a': case 'b': case 'c': case 'd': case 'e': case 'f': case 'g': case 'h':
             case 'i': case 'j': case 'k': case 'l': case 'm': case 'n': case 'o': case 'p':
             case 'q': case 'r': case 's': case 't': case 'u': case 'v': case 'w': case 'x':
             case 'y': case 'z':
             case '0': case '1': case '2': case '3': case '4': case '5': case '6': case '7':
             case '8': case '9':
             case '-':
                break;
             default:
                ilog( ".");
                return false;
          }
       }
       if( end == len )
          break;
       begin = end+1;
    }
    return true;
} FC_CAPTURE_AND_RETHROW( (name) ) }
```
